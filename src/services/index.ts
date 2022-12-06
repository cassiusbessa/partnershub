import 'dotenv/config';


class Service {
  
  constructor(private token = process.env.TOKEN, private baseUrl = process.env.BASE_URL) {
  }

  private async request(endpoint: string, param: any) {
    const res = await fetch(`${this.baseUrl}/${endpoint}?${param}`,
      { headers: { Authorization: `Bearer ${this.token}` } });
    return await res.json();
  }
  
  public async getUsers(since?: number, per_page?: number) {
    return this.request('user', {since: since || 0, per_page: per_page || 50});    
  }


}
