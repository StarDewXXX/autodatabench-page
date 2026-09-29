# AutoDataBench project page

A static website for `autodatabench.com`, with no build step. `index.html` is the project page and `blog.html` is the bilingual research essay. The blog article text is unchanged from `../StarDewXXX.github.io/blog/autodatabench.html`; the three figures and language switch are included locally. `paper.pdf` is a copy of `../adbpaper-arxiv/main.pdf` and should be refreshed when the paper changes.

## Publish with GitHub Pages

1. In the `StarDewXXX` GitHub account, create an **empty public** repository named `autodatabench-page`. Do not initialize it with a README, license, or `.gitignore` because this directory already has files and a local Git history.
2. From this directory, run `git push -u origin main`. GitHub will ask you to authenticate if needed.
3. In the new repository, open **Settings → Pages**. Choose **Deploy from a branch**, branch `main`, folder `/(root)`, then Save. Set **Custom domain** to `autodatabench.com` and Save. The `CNAME` file in this repository contains the same domain.
4. In Porkbun, open **Domain Management → autodatabench.com → Website** and cancel the free **Link In Bio** forwarding service currently redirecting the domain to `autodatabench-com.l.ink`. Then open **DNS**. Remove conflicting parking/forwarding `A`, `AAAA`, `ALIAS`, `ANAME`, or `CNAME` records for `@` and `www`, while leaving unrelated records such as email or verification TXT records intact.
5. Add four `A` records for host `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. Add a `CNAME` record for host `www` pointing to `StarDewXXX.github.io`. Porkbun also offers a **Quick DNS Config → GitHub** preset; confirm that it creates these values before saving.
6. Return to GitHub Pages. Wait for the DNS check and certificate, then enable **Enforce HTTPS**. Verify that `https://autodatabench.com/`, `/blog.html`, and `/paper.pdf` load. `www.autodatabench.com` should redirect to the apex domain.

GitHub recommends verifying the domain in account **Settings → Pages** using the TXT record it generates. Keep that TXT record after verification.

Official references: [GitHub custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [GitHub HTTPS setup](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [Porkbun GitHub Pages setup](https://kb.porkbun.com/article/64-how-to-connect-your-domain-to-github-pages), and [Porkbun Link In Bio forwarding](https://kb.porkbun.com/article/256-why-does-my-new-domain-redirect-to-a-l-ink-url).
