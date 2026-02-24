import * as React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Body,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Here&apos;s your verification code: {otp}</Preview>

      <Body style={{ backgroundColor: "#f6f9fc", padding: "20px" }}>
        <Section
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            maxWidth: "580px",
            margin: "0 auto",
          }}
        >
          <Row>
            <Heading as="h2">Hello {username},</Heading>
          </Row>

          <Row>
            <Text>
              Thank you for registering. Please use the following verification
              code to complete your registration:
            </Text>
          </Row>

          <Row>
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                letterSpacing: "4px",
                textAlign: "center",
                margin: "16px 0",
              }}
            >
              {otp}
            </Text>
          </Row>

          <Row>
            <Text style={{ color: "#555", fontSize: "14px" }}>
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
}
