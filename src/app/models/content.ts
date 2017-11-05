export class Content {
    constructor(public id:string,public titulo:string, public descipcion:string,public Poster:string, public path:string){

    }

}
export interface ContentOMBDDTO{
    title: string;
    year: string;
    poster: string;
    imdbID: string;
 }
