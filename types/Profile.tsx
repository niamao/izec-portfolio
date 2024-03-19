import { PortableTextBlock } from "sanity";

export type Profile = {
    _id: string;
    introduction: PortableTextBlock[];
    me: PortableTextBlock[];
    changing_texts: string[],
    arrow_color: object,
    timeline: object[],
    technologies: object[],
    email: string,
    github: string,
    linkedin: string,
    fullstack_filter: boolean
}