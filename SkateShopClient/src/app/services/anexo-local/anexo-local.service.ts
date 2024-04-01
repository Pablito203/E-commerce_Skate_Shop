import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { FilePicker, PickMediaOptions, PickedFile } from '@capawesome/capacitor-file-picker';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root'
})
export class AnexoLocalService {

  constructor() { }

  Carregar(): Promise<any> {
    const opcoes: PickMediaOptions = {};
    opcoes.multiple = true;

    return FilePicker.pickImages(opcoes).then(({ files }) => {
      if ( files.length == 0 ) {
        return Promise.reject("Nenhum arquivo selecionado");
      }

      let promisesComprimir: any[] = [];

      files.forEach(file => {
        promisesComprimir.push(this.ComprimirArquivo(file).then(blobComprimido => {
          return {
            Nome: file.name,
            Arquivo: blobComprimido,
            CaminhoArquivo: URL.createObjectURL(blobComprimido)
          }
        }))
      })

      return Promise.all(promisesComprimir).then(values => {
        return values;
      });
    }).catch(erro => {
      let msgErro = erro && erro.toString().includes("pickFiles canceled") ? "Nenhum arquivo selecionado" : "Não foi possível completar a operação";
      return Promise.reject(msgErro);
    })
  }

 async ComprimirArquivo(file: PickedFile): Promise<Blob> {
    let blob : Blob = new Blob();

    if (file.blob) {
      var options: any = {
        maxSizeMB: 1,
        useWebWorker: false,
        maxWidthOrHeight: 1920,
        initialQuality: 0.6
      }

      blob = await imageCompression(file.blob as File, options).then((CompressedFile: Blob) => CompressedFile).catch(() => file.blob || new Blob());
      return Promise.resolve(blob);
    }

    const webPath = Capacitor.convertFileSrc(file.path || "");
    const img = await imageCompression.loadImage(webPath);
    if (img.width > img.height) {
      if (img.width > 1920) {
        img.height = img.height * 1920 / img.width;
        img.width = 1920;
      }
    } else {
      if (img.height > 1920) {
        img.width = img.width * 1920 / img.height;
        img.height = 1920;
      }
    }

    const canvas = imageCompression.drawImageInCanvas(img);
    blob = await imageCompression.canvasToFile(canvas, file.mimeType, file.name, 0, 0.6)

    return Promise.resolve(blob);
  }
}
