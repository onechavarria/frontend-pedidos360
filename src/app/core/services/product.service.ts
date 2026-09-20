import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Respaldo visual para que el catálogo siga siendo navegable si el backend está apagado.
  private readonly demo: Product[] = [
    [1,'ASTRO BOT','Viaja junto a Astro por galaxias llenas de plataformas, secretos y desafíos creativos. Cada planeta aprovecha las habilidades del héroe y ofrece escenarios coloridos pensados para explorar con calma.',59990,20,'Aventura','astro-bot.webp','2024-09-06'],
    [2,'Mario Kart 8 Deluxe','Carreras arcade con circuitos, personajes y modos multijugador.',49990,25,'Carreras','mario-kart-8-deluxe.jpg','2017-04-28'],
    [3,'Minecraft','Construye, explora y sobrevive en un mundo abierto creado con bloques.',29990,35,'Sandbox','minecraft.jpg','2018-06-21'],
    [4,'Street Fighter II Ultra','Combate arcade clásico con luchadores, combos y enfrentamientos competitivos.',9990,18,'Lucha','street-fighter-ii-ultra.jpg','2017-05-26'],
    [5,'Super Mario Bros. 3','Plataformas clásicas con mundos, poderes y niveles llenos de desafíos.',19990,22,'Plataformas','super-mario-bros-3.jpg','1988-10-23'],
    [6,'Red Dead Redemption 2','Aventura de mundo abierto ambientada en el ocaso del Viejo Oeste estadounidense.',29990,16,'Acción y aventura','red-dead-redemption-2.webp','2018-10-26'],
    [7,'The Witcher 3: Wild Hunt','RPG de mundo abierto donde Geralt recorre un continente lleno de decisiones.',24990,19,'RPG','the-witcher-3-wild-hunt.webp','2015-05-19'],
    [8,'Super Mario Odyssey','Mario recorre distintos reinos acompañado por Cappy.',49990,21,'Plataformas','super-mario-odyssey.jpg','2017-10-27'],
    [9,'Elden Ring','RPG de acción y exploración en un vasto mundo fantástico.',52990,14,'RPG de acción','elden-ring.webp','2022-02-25'],
    [10,'God of War Ragnarök','Kratos y Atreus emprenden un viaje por los Nueve Reinos.',49990,17,'Acción y aventura','god-of-war-ragnarok.webp','2022-11-09'],
    [11,'Tekken 8','Combate 3D de nueva generación con personajes icónicos.',59990,13,'Lucha','tekken-8.webp','2024-01-26'],
    [12,'The Legend of Zelda: Tears of the Kingdom','Explora Hyrule y sus cielos con nuevas habilidades.',54990,18,'Aventura','zelda-tears-of-the-kingdom.jpg','2023-05-12'],
    [13,'Hollow Knight','Exploración y combate en el misterioso reino de Hallownest.',14990,28,'Metroidvania','hollow-knight.webp','2017-02-24'],
    [14,'The Legend of Zelda: Ocarina of Time','Acompaña a Link en una aventura inolvidable a través del tiempo para salvar Hyrule. Explora mazmorras, resuelve acertijos, aprende melodías con la ocarina y enfréntate a criaturas legendarias.',19990,20,'Aventura clásica','zelda-ocarina-of-time.jpg','1998-11-21'],
    [15,'Sonic the Hedgehog 2','Corre a toda velocidad con Sonic y Tails por zonas llenas de rutas alternativas, anillos y secretos. Domina el Spin Dash, reúne las Chaos Emeralds y detén los planes del Dr. Robotnik.',14990,9,'Plataformas','sonic-the-hedgehog-2.jpg','1992-11-21'],
    [16,'Final Fantasy VII','Únete a Cloud Strife y al grupo AVALANCHA en una historia épica que combina exploración, combates por turnos y personajes inolvidables. Recorre Midgar y descubre un conflicto que decidirá el futuro del planeta.',24990,12,'RPG clásico','final-fantasy-vii.jpg','1997-01-31']
  ].map(([id,nombre,descripcion,precio,stock,categoria,image,fecha]) => ({
    id: id as number, nombre: nombre as string, descripcion: descripcion as string,
    precio: precio as number, stock: stock as number, categoria: categoria as string,
    imagenUrl: `/assets/games/${image}`, fechaLanzamiento: fecha as string
  }));

  constructor(private readonly http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_BASE_URL}/productos`).pipe(
      map((items) => items.map((item) => this.normalizeImage(item))),
      catchError(() => of(this.demo))
    );
  }

  get(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${API_BASE_URL}/productos/${id}`).pipe(
      map((item) => this.normalizeImage(item)),
      catchError(() => of(this.demo.find((item) => item.id === id)))
    );
  }

  private normalizeImage(product: Product): Product {
    return { ...product, imagenUrl: product.imagenUrl || '' };
  }
}
