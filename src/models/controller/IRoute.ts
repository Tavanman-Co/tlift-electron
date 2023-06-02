import { IMethods } from "./IMethods";

export interface IRoute{
    method: IMethods;
    url: string;
    func: Function;
}