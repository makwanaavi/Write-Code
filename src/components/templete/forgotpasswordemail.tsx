import * as React from "react";

interface EmailTemplateProps {
  name: string;
  url: string;
}

export function ForgotPasswordeEmail({ name, url }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>
        reset password :
        <a href={url} target="_blank">
          Click Here
        </a>
        to reset.
      </p>
    </div>
  );
}
