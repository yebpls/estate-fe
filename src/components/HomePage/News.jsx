import React, { useState } from 'react'

export default function News() {
  return (
    <div>
        <div className="flex-grow p-4 flex gap-4" style={{ height: 300, width: 800 }}>
                {/* Column 1 */}
                <div className="bg-white p-4 flex-6">
                    <div>
                        <img src={'https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180'} alt="Description of your image" style={{ width: 400, height: 200 }} />
                        <p>Name 1</p>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="bg-white p-4 grid grid-row-2 flex-4">
                    <div>
                        <img src={'https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180'} alt="Description of your image" style={{ width: 200, height: 100 }} />
                        <p>Name 2</p>
                    </div>
                    <div>
                        <img src={'https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180'} alt="Description of your image" style={{ width: 200, height: 100 }} />
                        <p>Name 3</p>
                    </div>

                </div>
                <div className="bg-white p-4 flex-1">
                    <div>
                        <img src={'https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180'} alt="Description of your image" style={{ width: 400, height: 200 }} />
                        <p>Name 4</p>
                    </div>
                </div>
            </div>
        
    </div>
  )
}
