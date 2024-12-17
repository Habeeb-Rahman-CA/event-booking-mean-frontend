export interface IEvent {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    createdBy: string;
    attendees: string[];
}