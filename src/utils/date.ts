import moment from 'moment'

export const getTimeFromNow = (date: Date): string => {
  return moment(date).fromNow()
}
