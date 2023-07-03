/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * API 에러 응답 코드
 * 
 * 서비스 로직에 맞게 확장
 */
const enum ErrorCode {
  /** 성공 */
  SUCCESS = 0,
  /** 응답 값이 없는 경우 */
  NO_RESPONSE
}