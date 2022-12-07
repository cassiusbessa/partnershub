import { Request, Response } from 'express';
import Service from '../services';

class Controller {
  constructor() {}

  public async getUsers (req: Request, res: Response) {
    const { since, per_page } = req.query;
    const { status, data, nextPage }  = await Service.getUsers(since as string, per_page as string);
    return res.status(status).json({users: data, nextPage});
  }

  public async getUser (req: Request, res: Response) {
    const { username } = req.params;
    const { status, data }  = await Service.getUser(username);
    return res.status(status).json(data);
  }

}

export default new Controller();
