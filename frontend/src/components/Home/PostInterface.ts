import { UserInterface } from "../Profile/UserInterface";

export interface PostInterface {
  AttachmentLink: string;
  AttachmentType: string;
  User: UserInterface;
  comments: number;
  createdAt: string;
  hashtag: [string];
  id: string;
  likes: [string];
  sends: number;
  text: string;
  __typename: string;
}
