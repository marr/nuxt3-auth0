export const useAuthSession = async (event: H3Event) => {
  const { authSession } = useRuntimeConfig();
  const session = useSession(event, authSession);
  return session;
}