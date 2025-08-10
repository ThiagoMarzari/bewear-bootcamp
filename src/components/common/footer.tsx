export function Footer() {
  return (
    <footer className="mt-12 border-t bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-gray-900">
              © {new Date().getFullYear()} BEWEAR
            </span>
            <span className="text-sm text-gray-600">
              Todos os direitos reservados.
            </span>
          </div>
          
          <div className="flex flex-col gap-2 text-sm text-gray-600 md:text-right">
            <span>Desenvolvido com ❤️</span>
            <span>Moda sustentável e consciente</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
