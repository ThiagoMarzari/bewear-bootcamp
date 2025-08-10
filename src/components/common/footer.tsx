export function Footer() {
  return (
    <div className="mt-5 bg-[#f9f9f9] p-5">
      <div className="flex flex-col">
        <span className="font-semibold">
          © {new Date().getFullYear()} BEWEAR
        </span>

        <span>Todos os direitos reservados.</span>
      </div>
    </div>
  );
}
