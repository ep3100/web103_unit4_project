const API_BASE = import.meta.env.VITE_API_BASE || ''

async function request(path, options = {}) {
    const res = await fetch(API_BASE + '/api' + path, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error : 'Request failed'}))
        throw new Error(err.error || res.statusText)
    }
    return res.status === 204 ? null : res.json()
}

export const CarsAPI = {
    list: () => request('/cars'),
    get: (id) => request(`/cars/${id}`),
    create: (data) => request('/cars', { method: 'POST', body: JSON.stringify(data)}),
    update: (id, data) => request(`/cars/${id}`, { method: 'PUT', body: JSON.stringify(data)}),
    remove: (id) => request(`/cars/${id}`, { method: 'DELETE' }),
}