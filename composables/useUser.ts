export default function () {
  return useState<User>('user', () => null)
}