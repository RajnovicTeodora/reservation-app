import { DefaultModel } from './default-model';

export class Accommodation extends DefaultModel {
    name: string;
    description: string;
    address: string; // Todo maybe place the information inside a class
    photos: string[];
    benefits: string[];
    maxGuests: number;
    minGuests: number;
    automaticApproval: boolean;
    //scores: Score[];
    averageScore = 0;

    constructor(
        id: number,
        deleted: boolean,
        name: string,
        description: string,
        address: string,
        photos: string[],
        benefits: string[],
        maxGuests: number,
        minGuests: number,
        automaticApproval: boolean,
        //scores: Score[],
        averageScore = 0
    ) {
        super(id, deleted);
        this.name = name;
        this.description = description;
        this.address = address; // Todo maybe place the information inside a class
        this.photos = photos;
        this.benefits = benefits;
        this.maxGuests = maxGuests;
        this.minGuests = minGuests;
        this.automaticApproval = automaticApproval;
        //scores: Score[];
        this.averageScore = averageScore;
    }
}
