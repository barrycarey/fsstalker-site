export type NotificationService = {
    url: string;
    owner_id: number | null;
    id: number | null;
    name: string
}

export type Watch = {
    owner_id: number | null;
    id: number | null;
    active: boolean;
    include: string;
    exclude: string;
    subreddit: string;
    name: string;
    notification_services: NotificationService[];
    sent_notifications: SentNotification[]
}

export type PatreonTier = {
    name: string,
    max_watches: number,
    max_notification_services: number,
    notify_delay: number
}

export type User = {
    username: string,
    created_at: string,
    is_mod: boolean,
    patreon_tier_id: number,
    patreon_id: string
    patreon_tier: PatreonTier

}

export type SentNotification = {
    id: number;
    sent_at: string;
    triggered_post: string;
    watch_id: number;
    triggered_word: string;
    submission_created_at: string
}

export type SentNotificationTableRow = {
    id: number,
    sent_at: Date;
    triggered_post: string;
    watch: string;
    triggered_word: string;
    submission_created_at: Date;
    subreddit: string;

}
