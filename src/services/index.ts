import 'dotenv/config';
import fetch from 'node-fetch';


class Service {
  
  constructor(private token = process.env.TOKEN, private baseUrl = process.env.BASE_URL) {
  }

  private async request(endpoint: string, param: string) {
    const res = await fetch(`${this.baseUrl}/${endpoint}?${param}`,
      { headers: { Authorization: `Bearer ${this.token}` } });
    const result = await res.json();
    return { status: res.status, data: result}
  }
  
  public async getUsers(since?: string, per_page?: string) {
    const {status, data} = await this.request('users', `since=${since || 0}&per_page=${per_page || 50}`);
    const lastId = data.length ? data[data.length - 1].id : null;
    const nextPage = lastId ? `http://localhost:3001/api/users?since=${lastId}&per_page=${per_page || 50}` : null;
    return { status, data, nextPage }    
  }

  public async getUser(username: string) {
    const {status, data} = await this.request(`users/${username}`, '');
    return { status, data }    
  }

  public async getUserRepos(username: string) {
    const {status, data} = await this.request(`users/${username}/repos`, '');
    return { status, data }    
  }

}

export default new Service();
