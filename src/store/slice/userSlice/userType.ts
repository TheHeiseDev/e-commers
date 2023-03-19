export type InitialStateUser = {
  email: string | null;
  token: string | null;
  id: string | null;
  error?: {
    status: boolean;
    message: string | null;
  } | null
};
