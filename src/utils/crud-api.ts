type Phone = {
  id: string;
  name: string;
  sect: string;
  tel: string;
  image?: string;
};

// ใส่ข้อมูลเริ่มต้นไว้ให้เพื่อให้เปิดมาแล้วมีข้อมูลเลย (เหมือนที่อาจารย์มีมาให้)
let mockPhones: Phone[] = [
  { id: "1", name: "Steve Davis", sect: "CED", tel: "088-886-9845" },
  { id: "2", name: "John Doe", sect: "TCT", tel: "084-965-4528" },
  { id: "3", name: "Eric Johnson", sect: "TCT", tel: "02-304-6942" },
  { id: "4", name: "Nene Royal", sect: "CED", tel: "087-985-3542" },
];

// จำลองการทำงานของ Axios (Backend เสมือน)
const api = {
  get: async (url: string) => {
    if (url === "phones") {
      return { data: [...mockPhones] };
    }
    return { data: [] };
  },
  
  post: async (url: string, data: Phone) => {
    if (url === "phones") {
      mockPhones.push(data);
      return { data };
    }
    throw new Error("Route not found");
  },
  
  put: async (url: string, data: Partial<Phone>) => {
    if (url.startsWith("phones/")) {
      const id = url.split("/")[1];
      const index = mockPhones.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockPhones[index] = { ...mockPhones[index], ...data };
        return { data: mockPhones[index] };
      }
    }
    throw new Error("Phone not found");
  },
  
  delete: async (url: string) => {
    if (url.startsWith("phones/")) {
      const id = url.split("/")[1];
      mockPhones = mockPhones.filter((p) => p.id !== id);
      return { data: { success: true } };
    }
    throw new Error("Phone not found");
  }
};

export default api;