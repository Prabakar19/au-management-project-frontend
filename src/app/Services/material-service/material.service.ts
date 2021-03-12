import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from 'src/app/datastructure/material';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  materialURL = '/api/material/';
  id: string = 'id/';

  constructor(private http: HttpClient) {}

  addMaterialRequest(
    material: Partial<Material>,
    id: number
  ): Observable<Material> {
    return this.http.post<Material>(this.materialURL + id, material);
  }

  deleteMaterialRequest(id: number): Observable<Material> {
    return this.http.delete<Material>(this.materialURL + this.id + id);
  }
}
