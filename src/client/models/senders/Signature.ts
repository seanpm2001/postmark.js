import {DomainDetails} from "../domains/Domain";

export interface Signature {
    ID: number;
    Name: string;
    Confirmed: boolean;
    Domain: string;
    EmailAddress: string;
    ReplyToEmailAddress: string;
}

export interface SignatureDetails extends DomainDetails {
    Domain: string;
    EmailAddress: string;
    ReplyToEmailAddress: string;
    Confirmed: boolean;
}

export interface Signatures {
    TotalCount: number;
    SenderSignatures: Signature[];
}

export class SignatureOptions {
    constructor(Name?: string, ReplyToEmail?: string, ReturnPathDomain?: string) {
        this.Name = Name;
        this.ReplyToEmail = ReplyToEmail;
        this.ReturnPathDomain = ReturnPathDomain;
    }

    Name?: string;
    ReplyToEmail?: string;
    ReturnPathDomain?: string;
}

export class SignatureToCreate {
    constructor(Name: string, FromEmail: string, ReplyToEmail?: string, ReturnPathDomain?: string, ) {
        this.Name = Name;
        this.ReplyToEmail = ReplyToEmail;
        this.ReturnPathDomain = ReturnPathDomain;
        this.FromEmail = FromEmail;
    }

    Name: string;
    FromEmail: string;
    ReplyToEmail?: string;
    ReturnPathDomain?: string;
}

