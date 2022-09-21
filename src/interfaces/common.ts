export type NotificationService = {
    url: string;
    owner_id: number;
    id: number;
    name: string
}

export type Monitor = {
    owner_id: number;
    id: number;
    active: boolean;
    include: string;
    exclude: string;
    subreddit: string;
    name: string;
    notification_services: NotificationService[];
}

