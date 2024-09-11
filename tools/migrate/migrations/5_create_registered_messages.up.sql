CREATE TABLE `registered_messages`
(
    `id`         varchar(64) NOT NULL,
    `disabled`   tinyint(1)  NOT NULL,
    `title`       varchar(64) NOT NULL,
    `body`       varchar(256) NOT NULL,
    `created_at` datetime    NOT NULL,
    `updated_at` datetime    NOT NULL,
    PRIMARY KEY (`id`),
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

