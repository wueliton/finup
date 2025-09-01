function DashboardShimmer() {
  return (
    <div role="status" className="animate-pulse">
      <div className="gap-sm grid md:grid-cols-2">
        <div className="h-[14.5rem] w-full rounded-sm bg-gray-200" />
      </div>
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

export default DashboardShimmer;
