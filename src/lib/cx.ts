/** Une clases CSS ignorando las vacías: cx(styles.card, active && styles.active) */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
