import { useMutation, useQuery } from '@apollo/client';
import { useFragment } from '__generated__/query';
import { RegisteredMessagesFragmentFragment } from '__generated__/query/graphql';
import { PostMessageMutation } from 'features/GroupChat/apis/postMessage.command';
import { GetRegisteredMessagesQuery } from 'features/RegisteredMessages/api/getRegisteredMessages.query';
import { MaskedRegisteredMessages, RegisteredMessagesFragment } from 'features/RegisteredMessages/components/registeredMessagesFragment.query';
import { REGISTERED_USERS } from 'mocks/dummy-user';
import cron from 'node-cron';
import { useCallback, useEffect, useState } from 'react';

const useRegisteredMessagesFragment = (registeredMessagesFragment: MaskedRegisteredMessages) =>
  useFragment(RegisteredMessagesFragment, registeredMessagesFragment);

const CronApplication = (): JSX.Element => {
  let registeredMessages: RegisteredMessagesFragmentFragment[] = [];
  for (const user of REGISTERED_USERS) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useQuery(GetRegisteredMessagesQuery, {variables: { ownerId: user.id },});
    const fetchedRegisterdMessages = data?.getRegisteredMessages.map(useRegisteredMessagesFragment) || [];
    registeredMessages = [...registeredMessages, fetchedRegisterdMessages];
  }



  const [jobs, setJobs] = useState<Map<string, cron.ScheduledTask>>(new Map());

  const [postMessage] = useMutation(PostMessageMutation, {
    context: { clientName: "command" },
  });
  const handlePostMessage = useCallback(
    (groupChatId: string, message: string) => {
      postMessage({
        variables: {
          input: {
            groupChatId,
            executorId: myID,
            content: message,
          },
        },
      });
    },
    [groupChatId, postMessage, myID],
  );
  useEffect(() => {
    if (error) {
      console.error('Error fetching registered messages:', error);
      return;
    }

    if (data) {
      const newJobs = new Map<string, cron.ScheduledTask>();
      
      data.registeredMessages.forEach((message) => {
        const { id, cronExpression } = message;

        if (!jobs.has(id)) {
          // New job to be registered
          const job = cron.schedule(cronExpression, () => {
            // Your job logic here
            console.log(`Executing job for message ID: ${id}`);
          });

          newJobs.set(id, job);
        } else {
          // Update existing job if cron expression has changed
          const existingJob = jobs.get(id);
          if (existingJob && existingJob.getSchedule() !== cronExpression) {
            existingJob.stop();
            const job = cron.schedule(cronExpression, () => {
              // Your job logic here
              console.log(`Updating job for message ID: ${id}`);
            });
            newJobs.set(id, job);
          }
        }
      });

      // Remove jobs that no longer exist
      jobs.forEach((job, id) => {
        if (!data.registeredMessages.some((msg) => msg.id === id)) {
          job.stop();
          newJobs.delete(id);
        }
      });

      setJobs(newJobs);
    }
  }, [data, error, jobs]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 60000); // Refetch every minute

    return () => clearInterval(intervalId);
  }, [refetch]);

  return <></>;
};

export default CronApplication;
