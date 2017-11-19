export class Content {
    constructor(public id:string,public Title:string, public descipcion:string,
    	public fechaInicio:string, public Poster:string, public path:string,
    	public Plot:string,public Genre:string,public esPago:string,public Director:string,
    	public Actors:string, public Runtime:string,public imdbRating:string){

    }

}
export interface ContentOMBDDTO{
    title: string;
    year: string;
    poster: string;
    imdbID: string;
 }
