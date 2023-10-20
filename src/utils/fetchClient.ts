// const fetchClient = (url: string, options: any) => {
//   const BASE_URL = 'http://192.168.1.3/ProyectoComepa/web/';

//   return fetch(`${BASE_URL}${url}`, options);
// };

type Body = any & BodyInit_;
type Options = {} & RequestInit;
type Response = {
  codigo: number;
  mensaje: string;
  data?: any;
};

class FetchClient {
  private BASE_URL = 'http://192.168.1.3/ProyectoComepa/web/';

  public async get(url: string, options?: Options): Promise<Response> {
    return fetch(`${this.BASE_URL}${url}`, {
      ...options,
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        if (json.codigo && json.codigo !== 0) {
          throw new Error(json.mensaje);
        }
        return json;
      });
  }

  public async post(
    url: string,
    body: Body,
    options?: Options,
  ): Promise<Response> {
    return fetch(`${this.BASE_URL}${url}`, {
      ...options,
      method: 'POST',
      body,
    })
      .then(res => res.json())
      .then(json => {
        if (json.codigo !== 0) {
          throw new Error(json.mensaje);
        }
        return json;
      });
  }

  public async put(
    url: string,
    body: Body,
    options?: Options,
  ): Promise<Response> {
    return fetch(`${this.BASE_URL}${url}`, {
      ...options,
      method: 'PUT',
      body,
    })
      .then(res => res.json())
      .then(json => {
        if (json.codigo !== 0) {
          throw new Error(json.mensaje);
        }
        return json;
      });
  }

  public async delete(url: string, options?: Options): Promise<Response> {
    return fetch(`${this.BASE_URL}${url}`, {
      ...options,
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(json => {
        if (json.codigo !== 0) {
          throw new Error(json.mensaje);
        }
        return json;
      });
  }
}

export default new FetchClient();
