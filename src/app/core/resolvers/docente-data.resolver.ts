import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ComipyApiService } from '../../services/comipy-api.service';
import { AuthService } from '../../services/auth.service';
import { IDocente } from '../../data/interfaces/docentes.interface';

export const docenteDataResolver: ResolveFn<IDocente | null> = async (
  route,
  state
) => {
  try {
    const token = inject(AuthService).getTokenLocalstorage();
    const data = inject(AuthService).decodeJWT(token);
    const docenteData = await getDocenteById(Number(data.docente_id));
    return docenteData;
  } catch (error) {
    return null;
  }
};

function getDocenteById(docenteId: number): Promise<IDocente> {
  return new Promise((resolve, reject) => {
    inject(ComipyApiService)
      .getDocenteById(docenteId)
      .subscribe({
        next: (data) => {
          resolve(data);
        },
        error: () => reject(),
      });
  });
}
