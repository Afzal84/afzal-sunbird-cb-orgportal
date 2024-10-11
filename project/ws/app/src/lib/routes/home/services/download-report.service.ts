import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { forkJoin, Observable, of } from 'rxjs'
import { ConfigurationsService } from '@sunbird-cb/utils'
import { catchError, map } from 'rxjs/operators'
import * as _ from 'lodash'

const API_END_POINTS = {
  GET_REPORTS_INFO: `/apis/proxies/v8/operationalreports/v1/reportInfo`,
  DOWNLOAD_REPORTS: `/apis/proxies/v8/operationalreports/download`,
  GET_ADMINS: `/apis/proxies/v8/user/v1/search`,
  GET_ADMINS_ACCESSS_DETAILS: `/apis/proxies/v8/operationalreports/`,
  UPDATE_ACCESS: `/apis/proxies/v8/operationalreports/admin/grantaccess`,
  SEARCH_ORG: '/api/org/ext/v2/signup/search',
  GET_ORGS_OF_DEPT: '/apis/public/v8/org/v1/list',
  DOWNLOAD_OPS_REPORTS: '/apis/proxies/v8/operationalreports/v2/download',
}
@Injectable({
  providedIn: 'root',
})
export class DownloadReportService {
  baseUrl = this.configSvc.sitePath
  constructor(
    private http: HttpClient,
    private configSvc: ConfigurationsService
  ) { }

  getReportInfo() {
    return this.http.get<any>(`${API_END_POINTS.GET_REPORTS_INFO}`).pipe(map(res => _.get(res, 'result')))
  }

  downloadReports(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${API_END_POINTS.DOWNLOAD_REPORTS}`, { observe: 'response', responseType: 'blob' })
  }

  downloadReportsAll(rootOrgId: any): Observable<HttpResponse<Blob>> {
    const req = {
      request: {
        childId: [],
      },
    }
    return this.http.post<Blob>(`${API_END_POINTS.DOWNLOAD_OPS_REPORTS}/${rootOrgId}`, req, {
      responseType: 'blob' as 'json',
      observe: 'response',
    }).pipe(map((response: HttpResponse<Blob>) => response),
            catchError((error: HttpErrorResponse) => {
        const errorResponse: HttpResponse<Blob> = new HttpResponse({
          status: error.status,
          body: new Blob(),
        })
        return of(errorResponse)
      })
    )
  }

  getAdminsList(filter: object): Observable<any> {
    return this.http.post<any>(`${API_END_POINTS.GET_ADMINS}`, filter).pipe(map(res => _.get(res, 'result.response')))
  }

  getAccessDetails(readAssessEndPoint: string) {
    return this.http.get<any>(`${API_END_POINTS.GET_ADMINS_ACCESSS_DETAILS}${readAssessEndPoint}`)
      .pipe(map(res => _.get(res, 'result.response')))
  }

  updateAccessToReports(formData: any) {
    return this.http.post<any>(`${API_END_POINTS.UPDATE_ACCESS}`, formData)
  }

  searchOrgs(filterReq: any) {
    const req = {
      request: {
        filters: filterReq,
        limit: 10,
      },
    }
    return this.http.post(API_END_POINTS.SEARCH_ORG, req)
  }

  getOrgsOfDepartment(mapId: string): Observable<any> {
    return this.http.get<any>(`${API_END_POINTS.GET_ORGS_OF_DEPT}/${mapId}`)
  }

  downloadReportsForEachOrgId(rootOrgId: any, data: any[]): Observable<HttpResponse<Blob>[]> {
    const apiCalls = data.filter(item => item && item.sbOrgId).map((item: any) => {
      const req = {
        request: {
          childId: rootOrgId === item.sbOrgId ? [] : [item.sbOrgId],
        },
      }
      return this.http.post<Blob>(`${API_END_POINTS.DOWNLOAD_OPS_REPORTS}/${rootOrgId}`, req, {
        responseType: 'blob' as 'json',
        observe: 'response',
      }).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return of(new HttpResponse({
              status: 404,
              body: { message: 'Report not found for the requested organization' },
            }))
          }
          return of(error)
        })
      )
    })
    if (apiCalls.length > 0) {
      return forkJoin(apiCalls) as Observable<HttpResponse<Blob>[]>
    }
    return of([] as HttpResponse<Blob>[]) as Observable<HttpResponse<Blob>[]>
  }
}
