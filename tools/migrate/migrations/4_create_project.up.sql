CREATE TABLE `projects`
(
    `id`         varchar(64) NOT NULL,
    `disabled`   tinyint(1)  NOT NULL,
    `name`       varchar(64) NOT NULL,
    `leader`   varchar(64) NOT NULL,
    `created_at` datetime    NOT NULL,
    `updated_at` datetime    NOT NULL,
    PRIMARY KEY (`id`),
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

