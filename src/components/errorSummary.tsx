const ErrorSummary = ({
  errorMessages,
  error,
}: {
  errorMessages: string[];
  error: string;
}) => {
  return (
    <div
      className="error-summary"
      role="alert"
      aria-labelledby="error-summary-title"
    >
      {(errorMessages.length > 0 || error) && (
        <>
          <h2 id="error-summary-title" className="error-summary-title">
            Issues:
          </h2>
          <ul className="error-summary-list">
            {errorMessages.map((message, index) => (
              <li key={`form-error-${index}`}>{message}</li>
            ))}
            {error && <li>{error}</li>}
          </ul>
        </>
      )}
    </div>
  );
};

export default ErrorSummary;
