export function getPercentagePasswordStrength(password = ""): number {
  let errorRangePercent = 0;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const length = (/^(?=.{8,})/).test(password);
  const uppercase = (/^(?=.*[A-Z])/).test(password);
  const lowercase = (/^(?=.*[a-z])/).test(password);
  const number = (/^(?=.*[0-9])/).test(password);
  const special = (/^(?=.*[!@#$%^&*])/).test(password);

  if (passwordRegex.test(password)) {
    return 100;
  } else {
    if (length) errorRangePercent += 20;
    if (uppercase) errorRangePercent += 20;
    if (lowercase) errorRangePercent += 20;
    if (number) errorRangePercent += 20;
    if (special) errorRangePercent += 20;
  }
  return errorRangePercent;
}

export function getPasswordStrengthMessage(force: number): { message: string, color: string } {
  if (force === 100) return { message: "Very good password", color: "green" };
  else if (force >= 60) return { message: "Good password", color: "yellow" };
  else if (force >= 20) return { message: "Easy password", color: "red" };
  else return { message: "The password... bad?", color: "red" };
}