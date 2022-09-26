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

