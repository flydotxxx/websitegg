<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the visual system centralized in src/styles.css and Button variants; page layouts use the shared editorial classes so all public pages stay consistent.
- Reference archives supply design inspiration only; retain offer data from the active project when restyling.
- Load the decorative WebGL video shader lazily after video readiness; keep the native video underneath and disable motion for reduced-motion preferences or offscreen content to preserve accessible SSR and performance.
- Mount the shared CinematicEffects observer at the end of each public leaf page, after its content hydrates, for reveals and reading progress without per-section scroll listeners or root-level hydration races.
