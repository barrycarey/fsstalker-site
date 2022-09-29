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
