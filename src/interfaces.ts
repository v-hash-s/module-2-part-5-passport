interface UsersDB {
    [k: string]: string;
  }
  
  interface Token {
    [k: string]: string;
  } 


  interface GalleryResponse {
    objects: Array<string>,
    page: string,
    total: number
}

  interface ErrorMessage {
    errorMessage: string,
  }

export { UsersDB, Token, GalleryResponse, ErrorMessage }