export class Notification {
  constructor(
    public id: number = null,
    public status: string = '',
    public type: string = '',
    public destination: number = null,
    public url: string = '',
    public title: string = '',
    public child: number = null,
    public creationDate : string = null,
  ) {
  }
}
