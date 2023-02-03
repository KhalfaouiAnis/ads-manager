export interface AdModel {
    id: number,
    ad_creator: String,
    title: string,
    description: string,
    creation_date: Date,
    category: 'Education' | 'Travel',
    image?: string
}