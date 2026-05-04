export async function anexarResponseRelatorio(testInfo, response) {
    const responseApi = await response.text();
    let body;
    try {
        body = JSON.stringify(JSON.parse(responseApi), null, 2);
    } catch {
        body = responseApi;
    }
    await testInfo.attach('Response Log', {
        body: body,
        contentType: 'application/json'
    });
}
