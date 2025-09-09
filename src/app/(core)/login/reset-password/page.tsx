export default function ResetPasswordPage() {
  return (
    <div>
      <h1>Reset Password</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
