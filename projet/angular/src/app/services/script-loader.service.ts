import {Injectable} from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  {name: 'JquerySlim', src: '../../assets/front/js/jquery-3.3.1.slim.min.js'},
  {name: 'Bootstrap', src: '../../assets/front/js/bootstrap.bundle.min.js'},
  {name: 'Jquery', src: '../../assets/front/js/jquery.min.js'},
  {name: 'Scripts', src: '../../assets/front/js/scripts.js'},
  {name: 'espaceScripts', src: '../../assets/ecole/js/scripts.js'},
  {name: 'overlayScrollbars', src: '../../assets/admin/js/jquery.overlayScrollbars.min.js'},
  {name: 'adminlte', src: '../../assets/admin/js/adminlte.js'},
  {name: 'jQuery-3.4.1', src: '../../assets/admin/js/jQuery-3.4.1.min.js'},
  {name: 'Bootstrap-4.3.1', src: '../../assets/admin/js/bootstrap.bundle.min.js'}
];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  // IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      }
    });
  }

}
