export class User {
  constructor(
  public id : number=null,
  public nom : string='',
  public prenom : string='',
  public email : string ='',
  public status : string='',
  public userPassword: string = '',
  public birth_date : string='',
  public user_picture_file : string='',
  public adress : string='',
  public country : string='',
  public ville : string='',
  public phone : string='',
  public facebook_Id : string='',
  public google_Id : string=''
){}
}
