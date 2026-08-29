namespace SteamPrefill
{
    public sealed class SteamManager : IDisposable
    {
        private readonly PrefillSummaryResult _prefillSummaryResult = new PrefillSummaryResult();

        public SteamManager(IAnsiConsole ansiConsole)
        {
            _ansiConsole = ansiConsole;
        }

        #region Regiom

        /// <summary>
        /// Sample Summary
        /// </summary>
        public async Task SampleFunction()
        {
            // Comment
            var timer = Stopwatch.StartNew();
            _ansiConsole.LogMarkupLine("Starting login!");

            String availableGames = await _appInfoHandler.GetAvailableGamesByIdAsync(distinctAppIds);
            foreach (var app in availableGames)
            {
                var test = new Console();
            }
        }

        #endregion

    }
}