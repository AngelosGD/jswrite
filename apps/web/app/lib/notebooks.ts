

/*
? definimos los tipos / estructura de las notas y los notebooks
*/
export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Notebook = {
  id: string;
  name: string;
  color: string;
  pinned: boolean;
  starred: boolean;
  createdAt: string;
  updatedAt: string;
  notes: Note[];
};

export const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

/*? Esta llave es la que nos dira en que lugar exacto del navegador se guardaran todas las cosas, notebooks por ahora xd */
const STORAGE_KEY = "jswrite.notebooks";



export function listNotebooks(): Notebook[]{
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if(!raw) return [];

    try{
        return JSON.parse(raw) as Notebook[];
    }
    catch{
        return [];
    }
}

/*
? reescribe toda la lista de notebooks en el localstorage
 */
export function saveNotebook(notebooks: Notebook[]): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notebooks))
}


/* 
? los valores de name y color se ponen como parametro en la funcionn ya que esos tomra o se pedira al momento de crear el 
? notebook y los otros se definen en falso como el pinned/started o las fechas que se toma con una variable now
*/
export function createNotebook(name: string, color: string): Notebook{
    const now = new Date().toISOString();

    return {
        id: crypto.randomUUID(),
        name: name.trim() || "Sin titulo",
        color: color,
        pinned:false,
        starred:false,
        createdAt:now,
        updatedAt:now,
        notes:[],
    }
}


export function updateNotebook(
    notebooks: Notebook[],
    id: string,
    patch: Partial<Notebook>,
): Notebook[]{
    return notebooks.map((n) =>
        n.id === id ? {...n, ...patch, updateAt: new Date().toISOString() } : n
    )
}

export function deleteNotebook(notebooks: Notebook[], id: string): Notebook[] {
    return notebooks.filter((n) => n.id !== id)
}