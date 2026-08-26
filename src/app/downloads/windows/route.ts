import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch the latest release from the GitHub API
    const res = await fetch('https://api.github.com/repos/xavitje/RhymeHelper/releases/latest', {
      next: { revalidate: 60 } // cache for 60 seconds to avoid API rate limits
    });

    if (!res.ok) {
      console.error('Failed to fetch latest release from GitHub');
      return new NextResponse('Failed to fetch latest release', { status: 500 });
    }

    const release = await res.json();
    
    // Find the .exe asset in the release
    const exeAsset = release.assets.find((asset: any) => asset.name.endsWith('.exe'));

    if (!exeAsset) {
      return new NextResponse('No Windows installer found in the latest release', { status: 404 });
    }

    // Redirect to the GitHub download URL
    return NextResponse.redirect(exeAsset.browser_download_url);
  } catch (error) {
    console.error('Error in download redirect:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
