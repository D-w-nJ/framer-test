export enum ExceptionCode {
  SUCCESS = 0,
  NOT_FOUND,
  NOT_AUTHORIZED,
  TOKEN_INVALID,
  TOKEN_EXPIRED,
  USER_NOT_FOUND,
  DATABASE_ERROR,
  UNKNOWN
  // ...
}

export const ExceptionMessage = {
  [ExceptionCode.SUCCESS]: '성공',
  [ExceptionCode.NOT_FOUND]: '조회 결과 없음',
  [ExceptionCode.NOT_AUTHORIZED]: '권한 없음',
  [ExceptionCode.TOKEN_INVALID]: '토큰 인증 오류',
  [ExceptionCode.TOKEN_EXPIRED]: '토큰 만료',
  [ExceptionCode.USER_NOT_FOUND]: '유저 정보 없음',
  [ExceptionCode.DATABASE_ERROR]: '데이터베이스 오류',
  [ExceptionCode.UNKNOWN]: '확인 불가'
};