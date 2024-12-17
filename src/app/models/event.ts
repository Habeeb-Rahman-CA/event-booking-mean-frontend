export interface IEvent {
    _id?: string;
    title: string;
    description: string;
    date: Date | string;
    location: string;
    createdBy?: string;
    attendees?: string[];
}
