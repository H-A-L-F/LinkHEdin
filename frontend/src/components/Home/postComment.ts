import { UserInterface } from "../Profile/UserInterface";

export interface PostCommentInterface {
    ID: string,
    Likes: number,
    PostID: string,
    Replies: any[],
    Text: string,
    User: UserInterface,
    __typename: "Comment"
}